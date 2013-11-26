require 'cocoapods-core'

class PodfilelockParser < CommonParser

  # these are the same for all projects parsed with this parser
  attr_reader :language, :project_type

  # these are the inputs
  attr_accessor :lockfile_name, :url

  # these are the (intermediate) outputs
  attr_accessor :project, :lockfile


  def initialize
    @project_type = Project::A_TYPE_COCOAPODS
    @language     = Product::A_LANGUAGE_OBJECTIVEC
  end

  def parse url
    return nil unless url
    @url = url
    @lockfile = Pod::Lockfile.from_url url

    create_project
  end

  def parse_file filename
    return nil unless filename
    @lockfile_name = filename

    pathname = Pathname.new filename
    @lockfile = Pod::Lockfile.from_file pathname

    create_project
  end

  def create_project
    @project = init_project
    Rails.logger.info "created project #{@project}"
    create_dependencies
    @project
  end

  def init_project
    Project.new \
      project_type: project_type,
      language: language,
      url: url
  end

  def create_dependencies

    # lockfile.dependencies.each do |d|
    #   create_dependency d.name => d.requirement.as_list
    # end

    lockfile.pod_names.each do |pod_name|
      version = lockfile.version(pod_name)
      create_dependency( pod_name, version.version )
    end

    @project.dep_number = @project.projectdependencies.count
    Rails.logger.info "Project has #{@project.projectdependencies.count} dependencies"
  end

  def create_dependency dep_name, dep_version
    unless dep_name
      Rails.logger.debug "Problem: try to create_dependency(nil)"
      return nil
    end

    Rails.logger.debug "create_dependency '#{dep_name}' -- #{dep_version}"

    prod_key = dep_name.downcase
    product = load_product( prod_key )

    dependency = Projectdependency.new({
      :language => language,
      :prod_key => prod_key,
      :name     => dep_name,
      :version_requested  => dep_version,
      :comperator         => '=',
      :version_label      => dep_version
      })

    project.out_number     += 1 if dependency.outdated?
    project.unknown_number += 1 if dependency.prod_key.nil?
    project.projectdependencies.push dependency
    dependency.save
    dependency
  end



  VERSION_REGEXP = /^(=|!=|>=|>|<=|<|~>)\s*(\d(\.\d(\.\d)?)?)/
  def parse_version string
    string.match VERSION_REGEXP
    comperator, version = $1, $2
    return {:comperator => comperator, :version_requested => version}
  end

  def version_hash version_from_file, prod_name, product
    if [:git, :head].member? version_from_file
      Rails.logger.debug "WARNING dependency '#{prod_name}' requires GIT" # TODO
      return {:version_requested => "GIT", :version_label => "GIT", :comperator => "="}

    elsif :path == version_from_file
      Rails.logger.debug "WARNING dependency '#{prod_name}' requires PATH" # TODO
      return {:version_requested => "PATH", :version_label => "PATH", :comperator => "="}

    else
      comperator_version = parse_version version_from_file
      # TODO copy composer for version ranges

      comperator = comperator_version[:comperator]
      version    = comperator_version[:version_requested]

      if product
        version_requested = best_version(comperator, version, product.versions)
        return {:version_requested => version_requested, :version_label => version_from_file, :comperator => comperator}
      end

      return {:version_requested => version, :version_label => version_from_file, :comperator => comperator}
    end
  end

  # It is important that this method is not writing into the database!
  #
  def parse_requested_version(version_number, dependency, product)
    # This method has to be on every parser.
  end

  def best_version(comperator, version, versions)
    case comperator
    when ">"
      VersionService.greater_than(versions, version).version
    when ">="
      VersionService.greater_than_or_equal(versions, version).version
    when "<"
      VersionService.smaller_than(versions, version).version
    when "<="
      VersionService.smaller_than_or_equal(versions, version).version
    when "~>"
      starter         = VersionService.version_approximately_greater_than_starter( version )
      possible_vers   = VersionService.versions_start_with( versions, starter )
      highest_version = VersionService.newest_version_from( possible_vers )
      return highest_version.version if highest_version
      return version
    else
      version
    end
  rescue => e
    Rails.logger.error e.message
    version
  end

  def load_product name
    prod_key = name.downcase
    products = Product.where({:language => language, :prod_key => prod_key })
    if products.nil? || products.empty?
      Rails.logger.warn "no product found for language #{language} prod_key #{prod_key}"
      return nil
    elsif products.count > 1
      Rails.logger.error "more than one Product found for (#{language}, #{prod_key})"
    end

    products.first
  end
end
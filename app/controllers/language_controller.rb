class LanguageController < ApplicationController

  @@languages = [Product::A_LANGUAGE_JAVA, Product::A_LANGUAGE_RUBY,
    Product::A_LANGUAGE_PYTHON, Product::A_LANGUAGE_PHP, Product::A_LANGUAGE_NODEJS,
    Product::A_LANGUAGE_JAVASCRIPT, Product::A_LANGUAGE_CLOJURE, Product::A_LANGUAGE_R]

  def show
    sample_size           = 24
    max_population_size   = 10 * sample_size
    @lang            = Product.decode_language(params[:lang])
    @top_products    = Product.by_language(@lang).desc(:followers).limit(10)
    @latest_products = Newest.by_language(@lang).desc(:created_at).limit(10)
    @followers = []
    @languages = @@languages

    #build sample population of followers
    population = []
    User.all().each do |user|
      population << user if user.products.where(language: @lang).exists?
      break if population.count >= 50
    end

    #pick random followers from population
    @followers = population.sample(24)

    # lang_pattern = Regexp.new(@lang.downcase, true)
    # @vulnerabilities = SecurityNotification.all.in(languages: [lang_pattern]).desc(:modified).limit(30)

    # @feeds = LanguageFeed.by_language(@lang).map(&:url)
    # render template: "language/show"

  end

end
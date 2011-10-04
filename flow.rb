require 'rubygems'
require 'oauth'
require 'app_config'

def get_access_token
  p 'test'
  config = ApplicationConfiguration.new("api.yml")
  p 'ok'
  config = ApplicationConfiguration.new("api.yml")

  consumer = OAuth::Consumer.new(config.api.consumer_key, config.api.consumer_secret, {
    :site => "http://500px.com",
    :request_token_path => "/api/v1/oauth/request_token",
    :access_token_path => "/api/v1/oauth/access_token",
    :authorize_path => "/api/v1/oauth/authorize"})

  request_token = consumer.get_request_token()
  #access_token = consumer.get_access_token(request_token, {})

  oauth_token = OAuth::AccessToken.new(consumer, config.api.consumer_key, config.api.consumer_secret)

  access_token.get('http://500px.com/api/v1/photos.json')
  p 'here'
end

def access_api(token, secret)
  consumer = OAuth::Consumer.new(config.api.consumer_key, AppConfig.api.consumer_secret, {
    :site => "http://500px.com",
    :request_token_path => "/api/v1/oauth/request_token",
    :access_token_path => "/api/v1/oauth/access_token",
    :authorize_path => "/api/v1/oauth/authorize"})

end

get_access_token()

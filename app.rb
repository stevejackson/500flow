require 'rubygems'
require 'compass'
require 'sinatra'
require 'haml'
require './lib/flow'

set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, "views"
set :public_folder, "static"

enable :sessions

configure do
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.config'))
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"stylesheets/#{params[:name]}", Compass.sass_engine_options)
end

get '/' do
  session[:photo_index] = 0
  session[:page] = 1
  session[:stream] = 'popular'

  photos = get_current_stream()
 
  haml :index, :locals => { :photos => photos }
end

get '/popular' do
  session[:photo_index] = 0
  session[:page] = 1
  session[:stream] = 'popular'

  photos = get_current_stream()
 
  haml :index, :locals => { :photos => photos }
end

get '/editors' do
  session[:photo_index] = 0
  session[:page] = 1
  session[:stream] = 'editors'

  photos = get_current_stream()
 
  haml :index, :locals => { :photos => photos }
end

get '/getNextPage' do
  session[:page] += 1
  
  photos = get_current_stream()

  haml :gallery, :locals => { :photos => photos }
end

def get_current_stream()
  photos = get_photo_stream('photos?feature=' + session[:stream] + '&page=' + session[:page].to_s + '&rpp=15')
end

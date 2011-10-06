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
  photos = get_photo_stream('photos?feature=editors')
  session[:page] = 1
 
  haml :index, :locals => { :photos => photos }
end

get '/getNextPage' do
  session[:page] += 1
  
  photos = get_photo_stream('photos?feature=editors&page=' + session[:page].to_s)

  haml :gallery, :locals => { :photos => photos }
end

get '/photos' do

end

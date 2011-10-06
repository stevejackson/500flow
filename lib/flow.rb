require 'rubygems'
require 'json'
require 'addressable/uri'
require 'net/http'
require 'net/https'

require './lib/photo'

def get_photo_stream(stream_url)
  begin
    uri = URI.parse('https://api.500px.com/v1/' + stream_url + '&consumer_key=zbzOFyCpp6Ln55cZ3nAkuETESal6wsk1fsxG9xZO')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
  rescue Exception => e
    nil
  end

  return [] if response.nil?

  photos = []
  
  json_result = JSON.parse(response.body)

  json_result['photos'].each do |photo|
    image_url = photo['image_url']

    # remove some parameters, so we can access the full images
    uri = Addressable::URI.parse(image_url)
    params = uri.query_values
    params.delete('AWSAccessKeyId')
    params.delete('Expires')
    params.delete('Signature')
    uri.query_values = params
    
    p = Photo.new(uri.to_s.sub('2.jpg', '3.jpg'), uri.to_s.sub('2.jpg', '4.jpg'))
    photos << p
  end

  photos
end

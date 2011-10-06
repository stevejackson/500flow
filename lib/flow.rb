require 'rubygems'
require 'json'
require 'addressable/uri'
require 'net/http'

require './lib/photo'

def get_photo_stream(stream_url)
  uri = URI.parse('http://api.500px.com/v1/' + stream_url + '&consumer_key=zbzOFyCpp6Ln55cZ3nAkuETESal6wsk1fsxG9xZO')
  response = Net::HTTP.get_response(uri)

  photos = []
  
  json_result = JSON.parse(response.body)

  json_result['photos'].map { |photo|
    image_url = photo['image_url']

    # remove the AWSAccessKeyId, so we can access the full image...
    uri = Addressable::URI.parse(image_url)
    params = uri.query_values
    params.delete('AWSAccessKeyId')
    params.delete('Expires')
    params.delete('Signature')
    uri.query_values = params
    
    p = Photo.new(uri.to_s.sub('2.jpg', '3.jpg'), uri.to_s.sub('2.jpg', '4.jpg'))
    photos << p
  }

  photos
end

get_photo_stream('photos?feature=editors')


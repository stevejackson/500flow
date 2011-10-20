require 'rubygems'
require 'json'
require 'net/http'
require 'net/https'

require './lib/photo'

module Flow
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
      p = Photo.new
      image_url = photo['image_url']

      # 3 is our thumbnail size, 4 is the full image size
      p.thumb = image_url.to_s.sub('2.jpg', '3.jpg')
      p.full = image_url.to_s.sub('2.jpg', '4.jpg')
      p.title = photo['name']
      p.id = photo['id']

      photos << p
    end

    photos
  end
end

require './lib/flow'
require 'test/unit'

class FlowTest < Test::Unit::TestCase
  include Flow

  def test_popular_photo_stream_has_response
    result = get_photo_stream('photos?feature=popular')
    assert_not_equal result, []
  end

  def test_photo_stream_has_fields_filled_out
    photos = get_photo_stream('photos?feature=popular')

    assert_not_nil photos[0].thumb
    assert_not_nil photos[0].full
    assert_not_nil photos[0].title
    assert_not_nil photos[0].id
  end
end

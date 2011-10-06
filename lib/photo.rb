class Photo
  attr_reader :thumb, :full

  def initialize(thumb, full)
    @thumb = thumb
    @full = full
  end
end

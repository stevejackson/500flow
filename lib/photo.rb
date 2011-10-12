class Photo
  attr_accessor :thumb, :full, :title

  def initialize(thumb='', full='', title='')
    @thumb = thumb
    @full = full
    @title = title
  end

end

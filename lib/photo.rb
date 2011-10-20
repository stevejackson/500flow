module Flow

  class Photo
    attr_accessor :thumb, :full, :title, :id

    def initialize(thumb='', full='', title='', id='')
      @thumb = thumb
      @full = full
      @title = title
      @id = id
    end
  end

end

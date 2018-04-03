class MatrixesController < ApplicationController

  def index

  end

  def create
    numbers = params[:numbers].split(',').map(&:to_i)
    matrix = []
    numbers.each_slice(params[:n].to_i) do |slice|
      matrix << slice
    end

    seq = spiral(matrix, false)
    result = Matrix.find_or_create(seq: seq)

    render json: {
      data: "#{seq.join(' x ')} = #{result.value}",
      status: 1
    }
  end

  private
  def spiral(matrix, clockwise=true, t=0)
    matrix = matrix.transpose if !clockwise and t == 0
    
    t += 1

    if matrix.empty?
      []
    else
      matrix.shift + spiral(matrix.transpose.reverse, clockwise, t)
    end
  end

end

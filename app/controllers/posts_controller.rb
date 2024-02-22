class PostsController < ApplicationController
  def index

  end

  def show
    render(locals: {post_id: params[:id]})
  end
end

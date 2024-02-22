class PostsController < ApplicationController
  def index

  end

  def show
    render(locals: {post_id: params[:id], turbo_frame_request: turbo_frame_request?})
  end
end

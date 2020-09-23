class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.all
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article.destroy
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'Article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(
        :title, :body, :visibility,
        :image,
        image_attachment_attributes: %i[id _destroy],
        taggings_attributes: %i[id tag_id _destroy],
        comments_attributes: [
          :id, :name, :body, :visibility, :sort_key, :_destroy,
          images: [],
          images_attachments_attributes: [
            :id, :_destroy
          ],
        ]
      ).tap do |permitted|
        # 削除のための対応。空文字が送られてきたら ActiveSupport::MessageVerifier::InvalidSignature が出てしまうので、nilに置き換える
        # Rails6ではnilをうけるとpurge等してくれる。
        permitted[:image] = permitted[:image].presence
        permitted[:comments_attributes].each do |_, comm|
          comm[:images].map!(&:presence)
        end
      end
    end
end

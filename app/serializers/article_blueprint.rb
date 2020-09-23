class ArticleBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :body, :visibility

  association :image, blueprint: AttachedBlueprint do |article|
    article.image.attachment
  end
  association :comments, blueprint: CommentBlueprint
  association :taggings, blueprint: TaggingBlueprint
end

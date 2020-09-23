class CommentBlueprint < Blueprinter::Base
  identifier :id
  fields :name, :body, :sort_key, :visibility, :_destroy

  association :images, blueprint: AttachedBlueprint do |comment|
    comment.images.attachments
  end
end

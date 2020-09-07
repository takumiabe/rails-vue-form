ActionView::Helpers::Tags::Base.prepend FormBuilderWithVueJs

ActiveModel::Errors.prepend ActiveModelErrorWithAsJson

ActionView::Helpers::TagHelper::TagBuilder.prepend ActionViewTagHelperTagOptions

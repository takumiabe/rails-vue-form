require_dependency 'vue_option'

module ActionViewTagHelperTagOptions
  # @override ActionView::Helper::TagHelper::TagBuilder.tag_options
  # https://github.com/rails/rails/blob/a5cda0407fffe4214db3c40487d9d6394b391bc1/actionview/lib/action_view/helpers/tag_helper.rb#L65-L88
  def tag_options(options, escape = true)
    return super unless options.key?('vue').presence

    vue_opt = ::VueOption.new(options)
    vue_opt.bind

    super(vue_opt.to_h, escape)
  end
end

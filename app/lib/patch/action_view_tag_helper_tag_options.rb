module ActionViewTagHelperTagOptions
  # @override ActionView::Helper::TagHelper::TagBuilder.tag_options
  # https://github.com/rails/rails/blob/a5cda0407fffe4214db3c40487d9d6394b391bc1/actionview/lib/action_view/helpers/tag_helper.rb#L65-L88
  def tag_options(options, escape = true)
    return super unless options.key?('vue').presence

    vue_options = options.dup

    vue = vue_options.delete('vue')
    target =
      case vue
      when Array
        vue.map(&:to_s)
      else
        %w[id name for value] & vue_options.keys
      end

    target.each do |k|
      # 上書きはしないようにする
      unless vue_options["v-bind:#{k}"].present? || vue_options[":#{k}"].present?
        v = vue_options.delete(k)
        # v = vue_options[k]
        # JSのback-quote stringであるのに注意！
        vue_options["v-bind:#{k}"] = "\`#{v}\`".html_safe
      end
    end

    super(vue_options, escape)
  end
end

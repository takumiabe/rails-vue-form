module FormBuilderWithVueJS
  VUE_ATTR_REGEX = /^(v-|:|@)/

  # patch for ActionView::Helpers::Tags::Base
  # enable by `ActionView::Helpers::Tags::Base.prepend FormBuilderWithVueJS`
  def add_default_name_and_id(options)
    super

    # vue.jsっぽい痕跡があれば :name属性を `string` の形に置換する
    if options.keys.any? {|k| k.to_s.match? VUE_ATTR_REGEX }
      options[':name'] = "\`#{options.delete('name')}\`"
    end
  end
end

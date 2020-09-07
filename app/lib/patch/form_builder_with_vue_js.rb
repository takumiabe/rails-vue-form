require_dependency 'vue_option'

module FormBuilderWithVueJs
  def sanitized_object_name
    super if !@vue_opt || !(@vue_opt.has?(:id) || @vue_opt.has?(:for))

    @sanitized_object_name ||=
      begin
        # "aaa[bbb][ccc]" => ["aaa", "[bbb]", "[ccc]"]
        list = @object_name.scan(/[-a-zA-Z0-9:._]+|\[[^\[\]]*\]/)
        list.map! do |section|
          if section.starts_with?('[${') && section.ends_with?('}]')
            "_#{section[1..-2]}_"
          else
            section.gsub(/\]\[|[^-a-zA-Z0-9:.]/, "_")
          end
        end
        list.join.sub(/_$/, "")
      end
  end

  def add_default_name_and_id(options)
    if options['vue'].present?
      @vue_opt = ::VueOption.new(options)
    end

    super
  end
end

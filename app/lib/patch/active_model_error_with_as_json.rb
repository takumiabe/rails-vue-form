module ActiveModelErrorWithAsJson
  def serializable_hash(options = nil)
    options ||= {}

    names = to_h.keys.map(&:to_sym)
    if only = options[:only]
      names &= Array(only).map(&:to_sym)
    elsif except = options[:excep]
      names -= Array(except).map(&:to_sym)
    end

    hash = {}
    names.each {|n| hash[n] = full_messages_for(n) }
    hash
  end
end

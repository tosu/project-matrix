class Matrix < ApplicationRecord

  validates :md5, presence: true, uniqueness: true
  validates :value, presence: true

  def self.find_or_create opts = {}
    formula = opts[:seq].join('x')
    md5 = Digest::MD5.hexdigest(formula)

    unless record = find_by(md5: md5)
      record = create(md5: md5, value: opts[:seq].inject(1) { |m, n| m*n })
    end

    record
  end
end

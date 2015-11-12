require "json"

class EncryptionKeyGenerator
  def self.generate(level = 3)
    unencrypted_names  = %w(A 2 3 4 5 6 7 8 9 T J Q K)
    unencrypted_suits  = ["H", "S", "C", "D"]
    unencrypted_values = unencrypted_names.product(unencrypted_suits).map(&:join).shuffle!

    encrypted_names    = ("A".."M").to_a
    encrypted_suits    = (1..4).to_a
    encrypted_values   = encrypted_names.product(encrypted_suits).map(&:join)

    if level > 3
      encrypted_values.shuffle!
    end

    key = encrypted_values.inject({}) do |h, k|
      h.tap do
        h[k] = unencrypted_values.pop
      end
    end

    File.open("/tmp/encryption.json", "w") { |f| f.write(JSON.pretty_generate(key)) }
  end
end

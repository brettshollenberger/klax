require_relative "./src/encryption_key_generator"

task :generate_encryption_key do
  EncryptionKeyGenerator.generate
  sh "open /tmp/encryption.json"
end

task :generate_hard_encryption_key do
  EncryptionKeyGenerator.generate(4)
  sh "open /tmp/encryption.json"
end

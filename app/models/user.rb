# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

	before_validation :ensure_session_token

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

	def self.find_by_credentials(credential, password)
		type = ""
		if URI::MailTo::EMAIL_REGEXP.match?(credential)
			type = 'email'
		else
			type = 'username'
		end

		if type === 'username'
			user = User.find_by(username: credential)
		else
			user = User.find_by(email: credential)
		end

		if user && user.authenticate(password)
			return user
		else
			return nil
		end
	end

	def reset_session_token!
		self.session_token = generate_unique_session_token
		self.save!
		self.session_token
	end


	private

	def generate_unique_session_token
		token = SecureRandom::urlsafe_base64
		while User.exists?(session_token: token)
			token = SecureRandom::urlsafe_base64
		end
		token
	end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end

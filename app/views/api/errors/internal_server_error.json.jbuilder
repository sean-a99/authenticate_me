json.title 'Server error'
json.message @message
json.stack @stack unless Rails.env.production?


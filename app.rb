require 'sinatra'

set :public_folder, '.'

get '/' do
  File.read('index.html')
end

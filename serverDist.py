from livereload import Server

server = Server()
server.watch('dist', delay=0.1)
server.serve(root='dist', port=8080, host='localhost', debug=True)

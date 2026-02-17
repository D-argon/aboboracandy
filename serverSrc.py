from livereload import Server
import subprocess
from datetime import datetime

# env constants
SRC = "src"
SASS_SRC = SRC + "/sass"
CSS_OUT = SRC + "/style"

# compiles .sass/scss inside /sass to .css in /style
def compile_sass():
    try:
        subprocess.run([
            "sass",
            "--style=compressed",
            f"{SASS_SRC}:{CSS_OUT}",
            ], check=True)
        print(f"[{datetime.now().strftime('%H:%<:%S')}] SASS compiled")
    except subprocess.CalledProcessError as e:
        print(f'SASS error:\n {e}')

compile_sass()

# initiates file watching and avoid sass/style reload loop
server = Server()

server.watch(SASS_SRC, compile_sass)
server.watch(SRC, ignore=lambda p: "style/" in p, delay=0.1)

server.serve(root=SRC, port=8000, host='localhost', debug=True)

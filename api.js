const express = require('express');
const app = express()
const bodyP = require('body-parser')
const compiler = require('compilex')
const options = { stats: true }
compiler.init(options)

app.use(bodyP.json());
app.use(
  '/codemirror-5.65.13',
  express.static('/home/sourav/Downloads/codeEditor/codemirror-5.65.13')
)
app.get("/", function (req, res) {
  res.sendFile('/home/sourav/Downloads/codeEditor/index.html');
})


app.post('/compile', function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  try {
    // if(data.output){
    //     res.send(data)
    // }
    // else
    // {
    //     res.send({output:"error"})
    // }

    if (lang == 'Cpp') {
      if (!input) {
        //if windows
        var envData = {
          OS: 'windows',
          cmd: 'g++',
          options: { setTimeout: 1000 },
        }; // (uses g++ command to compile )
        //else
        var envData = {
          OS: 'linux',
          cmd: 'gcc',
          options: { setTimeout: 1000 },
        }; // ( uses gcc command to compile )
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      } else {
        //if windows
        var envData = {
          OS: 'windows',
          cmd: 'g++',
          options: { setTimeout: 1000 },
        }; // (uses g++ command to compile )
        //else
        var envData = {
          OS: 'linux',
          cmd: 'gcc',
          options: { setTimeout: 1000 },
        }; // ( uses gcc command to compile )
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          
            if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      }
    } else if (lang == 'Java') {
      if (!input) {
        //if windows
        var envData = { OS: 'windows' };
        //else
        var envData = { OS: 'linux' }; // (Support for Linux in Next version)
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      } else {
        //if windows
        var envData = { OS: 'windows' };
        //else
        var envData = { OS: 'linux' }; // (Support for Linux in Next version)
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      }
    } else if (lang == 'Python') {
      if (!input) {
        //if windows
        var envData = { OS: 'windows' };
        //else
        var envData = { OS: 'linux' };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      } else {
        //if windows
        var envData = { OS: 'windows' };
        //else
        var envData = { OS: 'linux' };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: 'error' });
          }
        });
      }
    }
  } catch (e) {
    console.log('error');
  }

});
app.listen(8000);

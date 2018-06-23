pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-v $HOME/jenkins/.npm:/root/.npm'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}

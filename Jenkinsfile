pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-v /root/.npm:/root/.npm'
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

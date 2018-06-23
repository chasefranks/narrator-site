pipeline {
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:6-alpine'
        }
      }
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      agent any
      steps {
        zip dir: 'dist', zipFile: 'site.zip'
      }
    }
  }
}

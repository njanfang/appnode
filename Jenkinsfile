pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/njanfang/appnode.git'
        NODE_HOME = '/usr/local/bin/node'  // Adjust based on your server's Node.js path
        PM2_HOME = '/home/your-user/.pm2'  // Adjust based on your server's PM2 path
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${GIT_REPO}", branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm install pm2@latest -g'
                sh 'pm2 stop ecosystem.config.js || true'
                sh 'pm2 start ecosystem.config.js'
                sh 'pm2 save'
            }
        }

        stage('Restart Nginx') {
            steps {
                sh 'sudo systemctl restart nginx'
            }
        }
    }

    post {
        always {
            sh 'pm2 delete all'
        }
    }
}

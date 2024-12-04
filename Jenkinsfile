pipeline {
    agent any

    environment {
        APP_DIR = "/var/lib/jenkins/workspace/appnode"
        NODE_VERSION = '20.18.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/njanfang/appnode.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'  // If you have a build step
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'pm2 stop all'  // Stop any running PM2 apps
                    sh 'pm2 start ecosystem.config.js'  // Start the app using PM2
                    sh 'pm2 save'  // Save the process list
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                script {
                    sh 'sudo systemctl restart nginx'  // Restart Nginx to apply changes
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}

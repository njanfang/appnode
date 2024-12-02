pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
    }

    stages {
        stage('Clone Repo') {
            steps {
                // Clone the repository from GitHub
                git 'https://github.com/njanfang/appnode.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies
                script {
                    sh "npm install"
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (if any)
                script {
                    sh "npm test"
                }
            }
        }

        stage('Build Application') {
            steps {
                // Build the app (optional)
                script {
                    sh "npm run build"
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    // Assuming you're using SSH to deploy to a server (you can also use Docker or Kubernetes)
                    sh """
                    ssh root@139.162.143.148 'cd /var/appnode/appnode && git pull origin main && npm install && pm2 restart app'
                    """
                }
            }
        }
    }

    post {
        success {
            // Notify successful deployment, or any other post action.
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

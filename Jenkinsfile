pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/njanfang/appnode.git'
        NODE_HOME = '/usr/bin/node'  // Adjust based on your server's path
        PM2_HOME = '/home/your-user/.pm2'  // Adjust based on your user's home directory
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull the latest code from GitHub
                git url: "${GIT_REPO}", branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // You can add build steps if needed (e.g., transpile, minify)
                    // sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Install PM2 if not installed
                    sh 'npm install pm2@latest -g'

                    // Stop the existing PM2 app (if running)
                    sh 'pm2 stop ecosystem.config.js || true'

                    // Start the app with PM2 using the ecosystem.config.js file
                    sh 'pm2 start ecosystem.config.js'

                    // Save the PM2 process list
                    sh 'pm2 save'
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                script {
                    // Restart Nginx to apply any changes (if necessary)
                    sh 'sudo systemctl restart nginx'
                }
            }
        }
    }

    post {
        always {
            // Cleanup and exit gracefully
            sh 'pm2 delete all'
        }
    }
}

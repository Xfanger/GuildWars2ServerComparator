module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		gitclone: {
			clone : {
				options: {
					repository : 'https://github.com/Xfanger/GuildWars2ServerComparator.git',
					directory : 'Build/',
					branch : 'master'
				}
			}
		},
		copy: {
			main: {
				expand : true,
				cwd : 'Build/app',
				src : ['**'],
				dest : 'parse/public/'
			}
		},
		clean : ["Build/*","Build/.git","Build/.gitattributes", "Build/.gitignore"],
		connect : {
			server : {
				options : {
					port : 9001,
					keepalive : true,
					base: "app/"
				}
			}
		},
		shell : {
			deploy : {
				command : [
					'cd parse',
					'parse deploy'
				].join('&&')
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', []);
	grunt.registerTask('deploy-test', ['clean','gitclone','copy','shell:deploy']); // Will pull latest changes from project master branch and stage in parse directory for deployment to test environment.
	grunt.registerTask('start-dev', ['connect']);
};
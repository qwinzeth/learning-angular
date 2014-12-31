var _ = require('lodash');

module.exports = function(grunt){

	var outputDirectory = 'src/public/_treasurehunt-grunt/';

	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		clean: [outputDirectory],
		jshint: {
			files: [
				'gruntfile.js'
			]
		},
		stylus: {
			compile: {
				files: {
					// Build programmatically
				}
			}
		},
		copy: {
			main: {
				files: [
					// Build programmatically
				]
			}
		},
		concat: {
			dist: {
				src: [
					'src/public/common/lodash.js',
					'src/public/common/angular.min.js',
					'src/public/common/angular-ui-router.js',
					'src/public/common/react.js',
					'src/public/common/jquery-2.1.3.js'
				],
				dest: outputDirectory + 'common/scripts.js'
			}
		},
		nodemon: {
		  dev: {
			script: 'src/server/index.js'
		  }
		}
	};
	
	var lintAndConcatFiles = [
		'src/public/common/treasurehuntApp.js',
		'src/public/features/treasure-field/treasurefieldCtrl.js',
		'src/public/features/game/gameCtrl.js'
	];
	gruntConfig.jshint.files = _.union(gruntConfig.jshint.files, lintAndConcatFiles);
	gruntConfig.concat.dist.src = _.union(gruntConfig.concat.dist.src, lintAndConcatFiles);
	
	var copyFiles = [
		'index.html',
		'features/treasure-field/treasure-field-partial.html',
		'features/hud/hud-partial.html',
		'features/game/game-partial.html'
	];
	gruntConfig.copy.main.files = _.map(copyFiles, function(fname){
		return {
			src: ['src/public/' + fname],
			dest: outputDirectory + fname
		};
	});

	gruntConfig.stylus.compile.files[outputDirectory + 'common/styles.css'] = [
		'src/public/features/treasure-field/treasure-field.styl',
		'src/public/features/treasure-brick/treasure-brick.styl',
		'src/public/features/hud/hud.styl'
	];
	
	grunt.initConfig(gruntConfig);
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-nodemon');
	
	grunt.registerTask('default', ['clean', 'jshint', 'stylus', 'copy', 'concat', 'nodemon']);
};
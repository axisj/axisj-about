module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				separator: '\n\n',
				banner: '<!DOCTYPE html>\n<!-- \n' +
				' <%= pkg.name %> - v<%= pkg.version %> \n' +
				' publish date : <%= grunt.template.today("yyyy-mm-dd") %> \n' +
				'-->\n',
				separator: '\n\n<!-- split -->\n\n'
			},
			core: {
				src: [
					'samples/layout/head.html',
					'samples/layout/visual-dom.html',
					'samples/axisj/core/*.html',
					'samples/layout/bottom.html'
				],
				dest: 'samples/index.html'
			}
		},
		watch: {
			core: {
				files: ['samples/axisj/core/*.html'],
				tasks: ['concat:core', 'replace:core']
			},
			sample_doc: {
				files: ['samples/css/*.scss'],
				tasks: ['sass:sample_doc']
			}
		},
		sass: {
			options: {
				sassDir: 'src/scss',
				cssDir: 'src/css',
				noLineComments: true,
				outputStyle:'nested',
				spawn: false
			},
			sample_doc: {
				files: {
					'samples/css/app.css': 'samples/css/app.scss'
				}
			}
		},
		replace: {
			core: {
				src: ['samples/index.html'],
				overwrite: true,                 // overwrite matched source files
				options: {
					processTemplates: false
				},
				replacements: [{
					from: /<pre[^>]*>([^<]*(?:(?!<\/?pre)<[^<]*)*)<\/pre\s*>/gi,
					to: function (matchedWord, index, fullText, regexMatches) {
						if(regexMatches.join('').substr(0, 9) == "$noscript"){
							return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/\$noscript\$/g, "").replace(/</g, "&lt;") +'</pre>';
						}else{
							return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/</g, "&lt;") +'</pre>' + '<h4>Result</h4>' + regexMatches.join('');
						}
					}
				}]
			}
		}
	});
	//grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('axisj-core', ['concat:core','replace:core','watch:core']);
	grunt.registerTask('sass-make-doc', ['sass:sample_doc','watch:sample_doc']);
};
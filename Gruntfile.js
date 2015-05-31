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
			intro: {
				src: [
					'samples/layout/head.html',
					'samples/layout/visual-dom.html',
					'samples/axisj/intro/*.html',
					'samples/layout/bottom.html'
				],
				dest: 'samples/index.html'
			},
			chapter1: {
				src: [
					'samples/layout/head.html',
					'samples/layout/visual-dom.html',
					'samples/axisj/chapter1/*.html',
					'samples/layout/bottom.html'
				],
				dest: 'samples/chapter1.html'
			},
			chapter2: {
				src: [
					'samples/layout/head.html',
					'samples/layout/visual-dom.html',
					'samples/axisj/chapter2/*.html',
					'samples/layout/bottom.html'
				],
				dest: 'samples/chapter2.html'
			}
		},
		watch: {
			intro: {
				files: ['samples/axisj/intro/*.html'],
				tasks: ['concat:intro', 'replace:intro']
			},
			chapter1: {
				files: ['samples/axisj/chapter1/*.html'],
				tasks: ['concat:chapter1', 'replace:chapter1']
			},
			chapter2: {
				files: ['samples/axisj/chapter2/*.html'],
				tasks: ['concat:chapter2', 'replace:chapter2']
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
			intro: {
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
			},
			chapter1: {
				src: ['samples/chapter1.html'],
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
			},
			chapter2: {
				src: ['samples/chapter2.html'],
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

	grunt.registerTask('intro', ['concat:intro','replace:intro','watch:intro']);
	grunt.registerTask('chapter1', ['concat:chapter1','replace:chapter1','watch:chapter1']);
	grunt.registerTask('chapter2', ['concat:chapter2','replace:chapter2','watch:chapter2']);
	grunt.registerTask('sass-make-doc', ['sass:sample_doc','watch:sample_doc']);
};
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
					'docs/layout/head.html',
					'docs/layout/visual-dom.html',
					'docs/axisj/intro/*.html',
					'docs/layout/bottom.html'
				],
				dest: 'docs/index.html'
			},
			chapter1: {
				src: [
					'docs/layout/head.html',
					'docs/layout/visual-dom.html',
					'docs/axisj/chapter1/*.html',
					'docs/layout/bottom.html'
				],
				dest: 'docs/chapter1.html'
			},
			chapter2: {
				src: [
					'docs/layout/head.html',
					'docs/layout/visual-dom.html',
					'docs/axisj/chapter2/*.html',
					'docs/layout/bottom.html'
				],
				dest: 'docs/chapter2.html'
			}
		},
		watch: {
			intro: {
				files: ['docs/axisj/intro/*.html'],
				tasks: ['concat:intro', 'replace:intro']
			},
			chapter1: {
				files: ['docs/axisj/chapter1/*.html'],
				tasks: ['concat:chapter1', 'replace:chapter1']
			},
			chapter2: {
				files: ['docs/axisj/chapter2/*.html'],
				tasks: ['concat:chapter2', 'replace:chapter2']
			},
			sample_doc: {
				files: ['docs/css/*.scss'],
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
					'docs/css/app.css': 'docs/css/app.scss'
				}
			}
		},
		replace: {
			intro: {
				src: ['docs/index.html'],
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
				src: ['docs/chapter1.html'],
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
				src: ['docs/chapter2.html'],
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
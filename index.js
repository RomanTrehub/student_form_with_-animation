const MIN_AGE = 1;
const MAX_AGE = 99;
var iterator;
window.addEventListener('load', function(){
	var studentAgeSelect = document.querySelector('select.student-age');
	var form = document.getElementsByTagName('form')[0];
	var removeButton = document.getElementsByClassName('remove-course');
	var coursesSpan = document.getElementsByClassName('student-courses')[0];
	var nameSpan = document.querySelector('span.student-name');
	var ageSpan = document.querySelector('span.student-age');
	var checkSpan = document.querySelector('span.student-at-university');
	var name = document.querySelector('input.student-name');
	var inputCourses = document.getElementsByClassName('student-course');
	var studentDataDiv = document.querySelector('.right-column');
	var studentForm = document.querySelector('.column');
	var dataSpans = document.querySelectorAll(".right-column span");
	function initAge(){
		var studentAgeSelect = document.querySelector('select.student-age');
	    for (iterator = MIN_AGE; iterator <= MAX_AGE; iterator++){
	      var studentAgeOption = document.createElement('option');
	      studentAgeOption.innerHTML = iterator;
	      studentAgeOption.value = iterator;
	      studentAgeSelect.appendChild(studentAgeOption);
		}
		  studentAgeSelect.addEventListener('change', function(){
			if ((studentAgeSelect.value <= 99) && (studentAgeSelect.value >= 1)){
				studentAgeSelect.style.borderColor = 'green';
			}else{
				studentAgeSelect.style.borderColor = 'red';
			}
		  })
	} 
	function checkbox(){
	  var checkbox = document.querySelector('input.student-at-university').checked;
		return checkbox === true? "Yes" : "No";
	} 
	function createName(){
		name.addEventListener('input', function(){
			var namePattern = /^[A-Z][a-z]*$/;
			if (name.value.length < 3 || !namePattern.test(name.value)){
				name.style.borderColor = 'red';
			}else{
				name.style.borderColor = 'green';
			}
		})
	}

	function createCourse(){
		var courseForm = studentForm.getElementsByClassName('form-group');
		var addCourse = studentForm.getElementsByClassName('add-course')[0];
		for (iterator = 3; iterator < 5; iterator++){
			courseForm[iterator].className = 'form-group course';
		}
		var courses = studentForm.getElementsByClassName("course");
		var cloneCourse = courses[0].cloneNode(true);
		
			form.addEventListener('input', function(event){	
				if (event.target.className == 'student-course'){
				var coursePattern = /^[A-Za-z\s]*$/;
					if (event.target.value.length < 4 || !coursePattern.test(event.target.value)){
						event.target.style.borderColor = 'red';
					}else{
						event.target.style.borderColor = 'green';
					}
				}
			});
		
		addCourse.addEventListener('click',function addCourse(event){
			var nextCourse = cloneCourse.cloneNode(true);
			nextCourse.querySelector('label').innerHTML = "Course " + ++courses.length + ":";
			form.insertBefore(nextCourse, event.target.parentNode);
			event.preventDefault();
		})
	}
	function daleteCourse(){
		var course = document.getElementsByClassName("course");
		
		form.addEventListener('click', function removeCourse(event){
			if(/remove\-course/.test(event.target.className)){
				if(removeButton.length < 3){
					return;
				}else{
					form.removeChild(event.target.parentNode);
					event.preventDefault();
					for (iterator = 0; iterator < course.length; iterator++){
						course[iterator].getElementsByTagName("label")[0].innerHTML = "Course" + (iterator +1 ) + ":";
					}
				}
			}
		});
	}

	function validateData(){
		var namePattern = /^[A-Z][a-z]*$/;
		if (name.value.length < 3 || !namePattern.test(name.value)){
			return false;
		}
		if (!(studentAgeSelect.value <= 99) && !(studentAgeSelect.value >= 1)){
			return false;
		}
		
		 for (iterator = 0; iterator < inputCourses.length; iterator++){
			 var coursePattern = /^[A-Za-z\s]*$/;
			 if (inputCourses[iterator].value.length < 4 || !coursePattern.test(inputCourses[iterator].value)){
				 return false;
			 }
		 }
		return true;	
	}
	
		// Animation/////////////////////////////////////////////
	function hideData(){
		studentDataDiv.style.opacity = 0;
		for (iterator = 0; iterator < dataSpans.length; iterator ++){
			dataSpans[iterator].style.opacity = 0;
		}
	}
	hideData();	
	function showDataValues(){
		var start = performance.now();
		var currentIndex = 0;
		
		requestAnimationFrame(function animate(time){
			var timePassed = time - start;
			
			if (timePassed > (currentIndex + 1) * 1000){
				dataSpans[currentIndex].style.opacity = 1;
				if(currentIndex < 3) currentIndex ++;			
			}
			dataSpans[currentIndex].style.opacity = (timePassed - currentIndex*1000)/1000;
			if (timePassed < 4000){
				requestAnimationFrame(animate);
			}else{
				var editButton = document.querySelector(".edit-student");
				editButton.addEventListener("click", function(){
					var start = performance.now();
					
					requestAnimationFrame(function animate(time){
						var timePassed = time - start;	
						if (timePassed <  2000){
							studentDataDiv.style.marginLeft = (50 * timePassed/2000) + "%";	
						}
						if (timePassed > 2000){
							studentDataDiv.style.marginLeft = "50%";
							studentForm.style.display = 'inline';
							studentDataDiv.style.marginLeft = "0%";
							studentDataDiv.style.opacity = 1 - timePassed/4000;
							studentForm.style.opacity = timePassed/4000;
						}
						if (timePassed < 4000){
							requestAnimationFrame(animate);
						}else{
							hideData();
						}
					})
				})
			}
		});
	}
	function moveDataDivLeft(){
		var start = performance.now();
		requestAnimationFrame(function animate(time){
			var timePassed = time - start;
			if(timePassed > 2000) timePassed = 2000;
			studentDataDiv.style.marginLeft = (-50 * timePassed/2000) + "%";
			if (timePassed < 2000){
				requestAnimationFrame(animate);
			}else{
				studentForm.style.display = 'none';
				studentDataDiv.style.marginLeft = '0%';
				showDataValues();
				
			}
		})
	}
	function showData() {
		var start = performance.now();
		
		requestAnimationFrame(function animate(time){
			var timePassed = time - start;
			if (timePassed > 2000) timePassed = 2000;
			studentDataDiv.style.opacity = timePassed/2000;
			studentForm.style.opacity = 1 - timePassed/2000;
			if (timePassed < 2000){
				requestAnimationFrame(animate);
			}else{
				moveDataDivLeft();
			}
		});
	}
	////////////////////////////////////////////////////////
	
	function moveData(){
		if (validateData() === true){
			var studentNameValue = name.value;
			nameSpan.innerHTML = studentNameValue;
			var studentAgeValue = studentAgeSelect.value;
			ageSpan.innerHTML = studentAgeValue;
			checkSpan.innerHTML = checkbox();
			var studentCourses = document.getElementsByClassName('course');
			var array = [];
			
			for (iterator = 0; iterator < studentCourses.length; iterator++){
				array.push(studentCourses[iterator].getElementsByTagName('input')[0].value);
				coursesSpan.innerHTML = array.join(', ');
			}
			showData();
		}else{
			if (name.style.borderColor !== 'green'){
				name.style.borderColor = 'red';
			}
			if (!(studentAgeSelect.value <= 99) && !(studentAgeSelect.value >= 1)){
				studentAgeSelect.style.borderColor = "red";

			}
			for (iterator = 0; iterator < inputCourses.length; iterator++){
				if (inputCourses[iterator].style.borderColor !== 'green'){
					inputCourses[iterator].style.borderColor = 'red';
				}
			}
		}
	}
	function formSubmitHandler(){
		form.addEventListener('submit', function(event){
		moveData();
		event.preventDefault();
		});
	}

		initAge();
		formSubmitHandler();
		createName();
		createCourse();
		daleteCourse();
});
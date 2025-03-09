class ProgressBlock {
    constructor(containerElement) {
      this.containerElement = containerElement;
      this.progressBlock = containerElement.querySelector('.progress-block');
      this.progressValue = containerElement.querySelector('.progress-circle-value');
  
      this.value = 0;
      this.animated = false;
      this.hidden = false;
      this.circumference = 2 * Math.PI * 45;
  
      this.render();
    }
  
    setValue(value) {
      if (isNaN(value) || value < 0 || value > 100) {
        console.error("Invalid value. Value must be between 0 and 100.");
        return;
      }
      this.value = value;
      this.render();
    }
  
    setAnimated(animated) {
      this.animated = animated;
      this.render();
    }
  
    setHidden(hidden) {
      this.hidden = hidden;
      this.render();
    }
  
    getValue() {
      return this.value;
    }
  
    isAnimated() {
      return this.animated;
    }
  
    isHidden() {
      return this.hidden;
    }
  
    render() {
      const offset = this.circumference - (this.value / 100) * this.circumference;
      this.progressValue.style.strokeDasharray = this.circumference;
      this.progressValue.style.strokeDashoffset = offset;
  
      if (this.animated) {
        this.progressBlock.classList.add('animated');
      } else {
        this.progressBlock.classList.remove('animated');
      }
  
      if (this.hidden) {
        this.progressBlock.classList.add('hidden');
      } else {
        this.progressBlock.classList.remove('hidden');
      }
      // Add or remove the 'full' class based on the value
      if (this.value === 100) {
        this.progressBlock.classList.add('full');
      } else {
        this.progressBlock.classList.remove('full');
      }
    }
  }
  
  
  // Получение элементов управления
  const valueInput = document.getElementById('value');
  const animateCheckbox = document.getElementById('animate');
  const hideCheckbox = document.getElementById('hide');
  
  // Инициализация ProgressBlock
  const progressBlockContainer = document.querySelector('.progress-block-container'); // Находим контейнер
  const progress = new ProgressBlock(progressBlockContainer); // Передаем контейнер
  
  // Обработчики событий для элементов управления
  valueInput.addEventListener('input', () => {
    const value = parseInt(valueInput.value);
    progress.setValue(value);
  });
  
  animateCheckbox.addEventListener('change', () => {
    progress.setAnimated(animateCheckbox.checked);
  });
  
  hideCheckbox.addEventListener('change', () => {
    progress.setHidden(hideCheckbox.checked);
  });
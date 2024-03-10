const adminTabs = $('.admin-tab');
const leftTab = $('.admin-left-bar')

leftTab.on('click', function(e) {
  const currentTab = e.target;

  if (currentTab.matches('a')) {
    adminTabs.removeClass('active');
    currentTab.classList.add('active');
  }
});

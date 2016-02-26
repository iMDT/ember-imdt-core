export function initialize(container, application) {
   application.inject('controller', 'applicationParameters', 'service:application-parameters');
}

export default {
  name: 'application-parameters',
  initialize
};

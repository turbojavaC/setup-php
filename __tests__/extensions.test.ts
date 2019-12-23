import * as extensions from '../src/extensions';

describe('Extension tests', () => {
  it('checking addExtensionOnWindows', async () => {
    let win32: string = await extensions.addExtension(
      'xdebug, pcov, redis, phalcon4',
      '7.4',
      'win32'
    );
    expect(win32).toContain('Add-Extension xdebug');
    expect(win32).toContain('Add-Extension pcov');
    expect(win32).toContain('Add-Extension redis beta');
    expect(win32).toContain('Add-Phalcon phalcon4');

    win32 = await extensions.addExtension(
      'phalcon3, does_not_exist',
      '7.2',
      'win32',
      true
    );
    expect(win32).toContain('Add-Phalcon phalcon3');
    expect(win32).toContain('Add-Extension does_not_exist');

    win32 = await extensions.addExtension('xdebug', '7.2', 'fedora');
    expect(win32).toContain('Platform fedora is not supported');
  });

  it('checking addExtensionOnLinux', async () => {
    let linux: string = await extensions.addExtension(
      'xdebug, pcov, redis',
      '7.4',
      'linux'
    );
    expect(linux).toContain(
      'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y php7.4-xdebug'
    );
    expect(linux).toContain('pecl install xdebug');
    expect(linux).toContain(
      'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y php7.4-pcov'
    );
    expect(linux).toContain('pecl install pcov');
    expect(linux).toContain(
      'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y php7.4-igbinary php7.4-redis'
    );

    linux = await extensions.addExtension('gearman', '7.0', 'linux');
    expect(linux).toContain('gearman.sh 7.0');
    linux = await extensions.addExtension('gearman', '7.1', 'linux');
    expect(linux).toContain('gearman.sh 7.1');

    linux = await extensions.addExtension(
      'phalcon3, phalcon4, gearman',
      '7.2',
      'linux'
    );
    expect(linux).toContain('phalcon.sh 3.4.x 7.2');
    expect(linux).toContain('phalcon.sh master 7.2');
    expect(linux).toContain('gearman.sh 7.2');

    linux = await extensions.addExtension(
      'phalcon3, phalcon4, gearman',
      '7.3',
      'linux'
    );
    expect(linux).toContain('phalcon.sh 3.4.x 7.3');
    expect(linux).toContain('phalcon.sh master 7.3');
    expect(linux).toContain('gearman.sh 7.3');

    linux = await extensions.addExtension('phalcon4, gearman', '7.4', 'linux');
    expect(linux).toContain('phalcon.sh master 7.4');
    expect(linux).toContain('gearman.sh 7.4');

    linux = await extensions.addExtension('xdebug', '7.2', 'fedora');
    expect(linux).toContain('Platform fedora is not supported');
  });

  it('checking addExtensionOnDarwin', async () => {
    let darwin: string = await extensions.addExtension(
      'xdebug, pcov',
      '7.2',
      'darwin'
    );
    expect(darwin).toContain('sudo pecl install xdebug');
    expect(darwin).toContain('sudo pecl install pcov');

    darwin = await extensions.addExtension('pcov', '5.6', 'darwin');
    expect(darwin).toContain('sudo pecl install pcov');

    darwin = await extensions.addExtension('pcov', '7.2', 'darwin');
    expect(darwin).toContain('sudo pecl install pcov');

    darwin = await extensions.addExtension('xdebug', '5.6', 'darwin');
    expect(darwin).toContain('sudo pecl install xdebug-2.5.5');

    darwin = await extensions.addExtension('xdebug', '7.2', 'darwin');
    expect(darwin).toContain('sudo pecl install xdebug');

    darwin = await extensions.addExtension('redis', '5.6', 'darwin');
    expect(darwin).toContain('sudo pecl install redis-2.2.8');

    darwin = await extensions.addExtension('redis', '7.2', 'darwin');
    expect(darwin).toContain('sudo pecl install redis');

    darwin = await extensions.addExtension(
      'does_not_exist',
      '7.2',
      'darwin',
      false
    );
    expect(darwin).toContain('add_extension does_not_exist');

    darwin = await extensions.addExtension('xdebug', '7.2', 'fedora');
    expect(darwin).toContain('Platform fedora is not supported');
  });
});

/**
 * 机器状态
 */
export const CVM_INSTANCE_STATE = {
  'PENDING': '创建中',
  'LAUNCH_FAILED': '创建失败',
  'RUNNING': '运行中',
  'STOPPED': '已关机',
  'STARTING': '开机中',
  'STOPPING': '关机中',
  'REBOOTING': '重启中',
  'SHUTDOWN': '待回收',
  'TERMINATING': '销毁中',
};
/**
 * 磁盘类型
 */
export const CVM_DISK_TYPE = {
  'CLOUD_PREMIUM': '高性能云硬盘',
  'CLOUD_SSD': 'SSD云硬盘',
};

/***
 * 付费类型
 */
export const CVM_INSTANCE_CHARGE_TYPE = {
  'PREPAID': '包年包月',
  'POSTPAID_BY_HOUR': '按小时后付费',
};

/***
 * 磁盘挂载类型
 */
export const TC_DISK_MOUNT_COUNT = {
  'singleweb_1': '1个web盘',
  'singledata_1': '1个数据盘',
  'multidata_2': '2个数据盘',
  'multidata_3': '3个数据盘',
  'multidata_4': '4个数据盘',
  'multidata_5': '5个数据盘',
  'multidata_6': '6个数据盘',
};

export const IDC_DISK_MOUNT_COUNT = {
  'singleweb_1': '1个web盘',
  'singledata_1': '1个数据盘',
};

/***
 *openstack配置
 */
export const DVM_VM_STATUS = {
  'active': '运行中',
  'suspended':"已暂停",
  'stopped': '已关机',
  'soft_deleted':"待回收",
  'hard_deleted':"待回收",
  'error':'ERROR',
};

export const DVM_TASK_STATE = {
  'building': '创建中',
  'image-snapshotting':"未知",
  'image-backingup':'未知',
  'updateing-password':'密码修改中',
  'pausing': '暂停中',
  'uppausing': '未知',
  'suspending':"未知",
  'resuming': '恢复中',
  'deleting': '销毁中',
  'stopping': '停止中',
  'starting': '开启中',
  'spawning':'创建中',
  'powering-on': '开机中',
  'powering-off': '关机中',
  'rebooting': '重启中',
  'reboot_started':'重启中',
};

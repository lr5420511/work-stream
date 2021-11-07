<template>
    <el-container>
        <el-header class="view-scene-setting-tip"
                   height="auto">
            <el-alert title="页面描述"
                      description="该页面提供系统场景源图片的编辑功能，可以上传新增源图片，当然也可以删除已存在的源图片"
                      :closable="false"
                      show-icon>
            </el-alert>
        </el-header>
        <el-main class="view-scene-setting-content">
            <ser-pictures :path="uploadUrl"
                          :maximum="maximumCount"
                          :pictures="pictures"
                          @validateAbort="validateError"
                          @enterRemove="removeScene"
                          @finish="uploaded">
            </ser-pictures>
        </el-main>
    </el-container>
</template>

<script>
import ServicePictures from '../components/service-pictures.vue';
import { UPLOAD_SETTING_SCENE_URL, REMOVE_SETTING_SCENE_URL, SCENE_MAXIMUM_COUNT } from '../config';

export default {
    components: {
        'ser-pictures': ServicePictures
    },
    data: () => ({
        maximumCount: SCENE_MAXIMUM_COUNT
    }),
    computed: {
        uploadUrl: cur => {
            const { username, password } = cur.$store.getters;
            return [UPLOAD_SETTING_SCENE_URL, '?username=', username, '&password=', password].join('');
        },
        pictures: cur => cur.$store.getters.scenes.map(scene => ({ url: scene }))
    },
    methods: {
        validateError: function(err) {
            this.$message({ type: 'error', message: err.message });
        },
        uploaded: function(successes, fails) {
            const [scount, fcount] = [successes, fails].map(cur => cur.length);
            successes.forEach(cur => 
                this.$store.commit('appendScene', { scene: cur.response.result })
            );
            this.$message({
                type: scount ? (fcount ? 'warning' : 'success') : 'error',
                message: `本次上传图片${scount + fcount}张，其中上传成功${scount}张，上传失败${fcount}张${
                    fcount ? `（${fails.map(fail => fail.name).join('、')}）` : ''
                }`,
                duration: 9000
            });
        },
        removeScene: async function(picture) {
            const { url } = picture,
                { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    REMOVE_SETTING_SCENE_URL, 
                    `?username=${username}`, 
                    `&password=${password}`, 
                    `&path=${url}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error } = res;
            if(!error) this.$store.commit('removeScene', { scene: res.result });
            this.$message({
                type: error ? 'error' : 'success',
                message: error ? res.result : '场景源图片删除成功'
            });
        }
    }
};
</script>

<style lang="less" scoped>
.view-scene-setting {
    &-tip {
        padding: 0;
        margin-bottom: 20px;
        line-height: 90%;
    }
    &-content {
        padding: 0;
    }
}
</style>
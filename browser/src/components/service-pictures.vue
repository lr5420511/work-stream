<template>
    <el-upload list-type="picture-card"
               :action="path"
               :limit="maximum"
               :file-list="pictures"
               :on-exceed="exceedHook"
               :before-upload="beforeUploadHook"
               :on-success="successHook"
               :on-error="errorHook"
               :before-remove="beforeRemoveHook"
               multiple>
        <i class="el-icon-plus"></i>
    </el-upload>
</template>

<script>
const [successes, fails] = Array(2).fill(null).map(() => []);

export default {
    props: {
        path: {
            type: String,
            default: '/',
            validator: val => /^\/(?:(?:[^\n\/\?]+\/)*[^\n\/\?]+)?(?:\?[^\n=]+=.+)?$/.test(val)
        },
        pictures: {
            type: Array,
            default: () => []
        },
        maximum: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && val === Math.floor(val)
        },
        include: {
            type: RegExp,
            default: () => /^image\/jpeg$/i
        },
        size: {
            type: Number,
            default: 3 * 1024 * 1024,
            validator: val => val > 0 && val === Math.floor(val)
        }
    },
    created: function() {
        const invalid = this.pictures.length > this.maximum;
        if(invalid) throw new RangeError('pictures is invalid.');
    },
    methods: {
        exceedHook: function(currents, olds) {
            const [commitCount, count] = [currents.length, olds.length],
                err = new RangeError(`上传图片总数不能超过${this.maximum}张，当前已存在${count}张，本次提交了${commitCount}张`);
            this.$emit('validateAbort', err, currents);
        },
        beforeUploadHook: function(picture) {
            const { type, size, name } = picture,
                [typeValid, sizeValid] = [this.include.test(type), size <= this.size],
                valid = typeValid && sizeValid;
            if(!valid) {
                const err = typeValid ? 
                    new RangeError(`上传图片(${name})大小不能超过${this.size / Math.pow(1024, 2)}MB`) : 
                    new TypeError(`上传图片(${name})格式不能为${type}`);
                this.$emit('validateAbort', err, picture);
            }
            return valid;
        },
        successHook: function(res, picture, pictures) {
            const { error } = res;
            (error ? fails : successes).push(picture);
            this.$emit(error ? 'uploadFail' : 'uploadSuccess', picture);
            error && pictures.splice(pictures.indexOf(picture), 1);
            const last = successes.length >= pictures.length - this.pictures.length;
            if(last) {
                this.$emit('finish', successes, fails);
                [successes, fails].forEach(cur => cur.splice(0));
            }
        },
        errorHook: function(err, picture, pictures) {
            fails.push(picture);
            this.$emit('uploadFail', picture);
            const last = successes.length >= pictures.length - this.pictures.length;
            if(last) {
                this.$emit('finish', successes, fails);
                [successes, fails].forEach(cur => cur.splice(0));
            }
        },
        beforeRemoveHook: function(picture) {
            const { status } = picture;
            if(status === 'success') {
                this.$emit('enterRemove', picture);
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="less" scoped>
</style>